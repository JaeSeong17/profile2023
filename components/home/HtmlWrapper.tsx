import Skills from './html/Skills';
import Descriptions from './html/Descriptions';
import Introduce from './html/Introduce';
import Contact from './html/Contact';
import Title from './html/Title';

export default function HtmlWrapper() {
  return (
    <div className='h-[25000px]'>
      <Title />
      <Introduce />
      <Skills />
      <Descriptions />
      <Contact />
    </div>
  );
}
