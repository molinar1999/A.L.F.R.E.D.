import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';


export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    // do some work in here . . .
    useEffect(() => {
        let unsubscribe = firebase
        .firestore()
        .collections('tasks')
        .where('userId', '==', '6273');

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
    }, [selectedProject])
}