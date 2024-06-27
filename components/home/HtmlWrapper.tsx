import SkillsRework from './html/SkillsRework';
import DescriptionsRework from './html/DescriptionsRework';
import IntroduceRework from './html/IntroduceRework';
import ContactRework from './html/ContactRework';
import TitleRework from './html/TitleRework';

export default function HtmlWrapper() {
  return (
    <div className='h-[25000px]'>
      <TitleRework />
      <IntroduceRework />
      <SkillsRework />
      <DescriptionsRework />
      <ContactRework />
    </div>
  );
}
