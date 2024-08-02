import React from 'react'

const Footer = () => {
    return (
        <>
        <footer class="py-4 px-4 md:px-8 bg-white border-t-slate-200 border">
            <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <div class="mb-4 md:mb-0">
                    <h3 class="md:text-2xl font-bold mb-2 text-lg">Connect with the Developer</h3>
                    <p class="md:text-lg text-sm">Reach out for collaborations, feedback, or just to say hi!</p>
                </div>
                <div class="flex space-x-4">
                    <div className='flex flex-col items-center justify-center'>
                        <img undefinedhidden="true" alt="GitHub" className='md:h-8 md:w-8 h-5 w-5' src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" />
                        <a href="https://github.com/antamayo1" class="text-primary hover:underline">
                        GitHub</a>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <img undefinedhidden="true" alt="GitHub" className='md:h-8 md:w-8 h-5 w-5' src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" />
                        <a href="https://linkedin.com/in/ajtamayo" class="text-primary hover:underline">
                        LinkedIn</a>
                    </div>
                    
                    <div className='flex flex-col items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-discord md:h-8 md:w-8 h-5 w-5" viewBox="0 0 16 16">
                            <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
                        </svg>
                        <a href=" https://discordapp.com/users/.patani" class="text-primary hover:underline">
                        Discord</a>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer