import Title from './html/Title';
import Introduce from './html/Introduce';
import Skills from './html/Skills';
import Descriptions from './html/Descriptions';
import Contact from './html/Contact';
import IntroduceRework from './html/IntroduceRework';

export default function HtmlWrapper() {
  return (
    <div className='h-[25000px]'>
      <Title />
      <IntroduceRework />
      <Skills />
      <Descriptions />
      <Contact />
    </div>
  );
}
