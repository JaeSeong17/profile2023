import TitleFramer from './html/TitleFramer';
import IntroduceFramer from './html/IntroduceFramer';
import SkillsFramer from './html/SkillsFramer';
import DescriptionsFramer from './html/DescriptionsFramer';
import ContactFramer from './html/ContactFramer';

export default function HtmlWrapper() {
  return (
    <div className='h-[25000px]'>
      <TitleFramer />
      <IntroduceFramer />
      <SkillsFramer />
      <DescriptionsFramer />
      <ContactFramer />
    </div>
  );
}
