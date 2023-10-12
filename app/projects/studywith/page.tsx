import ProjectWrapper from '@/components/projects/ProjectWrapper';
import projectsData from '@/public/static/projectsData';

export default function Home() {
  return <ProjectWrapper data={projectsData[1]} />;
}
