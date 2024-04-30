import styles from './styles.module.css';
import Navbar from '../components/navbar/navbar';
import Foobar from '../components/foobar/foobar';
import HeroSection from './components/hero';
import ChatDemoSection from './components/chat.demo';
import TeamsSection from './components/teams';
import FeatureSection from './components/features';


export default function LandingPage() {
    return (
        <div className={`bg-[#000212] ${styles['radient-bg-fill-2']}`}>
            <Navbar />

            <div className={`w-full min-h-screen flex flex-col justify-start items-center p-10 bg-transparent relative`}>
                <HeroSection />
                <ChatDemoSection />
                <TeamsSection />
                <FeatureSection />
            </div>

            <Foobar />
        </div>
    );
}