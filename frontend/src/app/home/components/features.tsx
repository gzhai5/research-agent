export default function FeatureSection() {
    return (
        <div className={`flex flex-col gap-6 w-full min-h-[25rem] px-20 pb-20 items-center rounded-t-full border-t border-[#7877C6]/[0.4] bg-[#000212]`}>
            
            {/* titles */}
            <div className="flex flex-col gap-4 justify-center items-center mt-20">
                <p className="font-medium text-4xl text-center text-[#F7F8F8]">A new area <br/> you&apos;ve never touched before</p>
                <p className="font-normal text-xl text-center text-[#B4BCD0]">Scrape latest arxiv papers. Quickly browse your area&apos;s studies. <br/> Ask your personal agent any related research problems.</p>
            </div>
        
        </div>
    );
}