import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';


export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    // do some work in here . . .
    useEffect(() => {
        let unsubscribe = firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', '111');

        unsubscribe = selectedProject && !collatedTasksExist(selectedProject) ? 
        (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYY')
            ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));


            setTasks(
                selectedProject === 'NEXT_7'
                ? newTasks.filter(
                    // filter out the tasks that are less than or equal 7 days away
                    task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                    task.archived !== true
                )
                : newTasks.filter(task => task.archived !== true)
            );
            setArchivedTasks(newTasks.filter(task => task.archived !== false));
        });

        return () => unsubscribe();
    }, [selectedProject])
    // Basically, when selectedProject changes, re run all of useTasks.

    return { tasks, archivedTasks };

};
// const selectedProject = 1;
// const { tasks, archivedTasks } = useTasks(selectedProject);


// we wont be checking for projects live as we are with tasks.
export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('projects')
        .where('userId', '==', '111')
        .orderBy('projectId')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));

            if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                setProjects(allProjects);
                // This condition protects against an infinite loop. 
                // Bc useProjects will change everytime projects changes, but
                // the hook itself changes projects.
            }
        })
    }, [projects]);

    return { projects, setProjects };
}