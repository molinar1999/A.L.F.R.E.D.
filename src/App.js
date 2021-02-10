import React from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProejctProvider} from './context';
export const App = () => {
  return (
    <SelectedProjectedProvider>
      <ProjectsProvider>
        <div className="App">
          <Header />
          <Content />
        </div>
      </ProjectsProvider>

    </SelectedProjectedProvider>

  )

};
   



