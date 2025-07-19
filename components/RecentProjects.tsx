"use client"

import React from 'react'

import { Title } from './ui/Title'
import { Quote } from './Quote'
import { WebProjects } from './WebProjects'
import { MobileProjects } from './MobileProjects'


function RecentProjects() {
    // const { data: webProjects, loading:webProjectsLoading } = useAppwrite({
    //     fn: fetchProjects,
    //     params: { type: 'web' },
    // })

    // const { data: mobileProjects, loading: mobileProjectsLoading } = useAppwrite({
    //     fn: fetchProjects,
    //     params: { type: 'mobile' },
    // })

    // if (webProjectsLoading || mobileProjectsLoading)
    //     return <p className="text-center text-white">Chargement...</p>

    // if (!webProjects || !mobileProjects || webProjects.length === 0 || mobileProjects.length === 0)
    //     return <p className="text-center text-white">Aucun projet trouvé.</p>

    return (
        <div id="projects" className="py-16">
            <Title title="3. Projets  récents" />
            <Quote
                quote={"« Il ne savait pas que c’était impossible, alors il l’a fait. »"}
                author={"— Mark Twain"}
            />

            <h3 className="text-3xl mt-24 text-center text-blue-900 font-bold dark:text-white">
                — Projets web —
            </h3>
            <WebProjects />
            {/* <LearnMoreLink text="Tout mes projets web" href="/projects" /> */}


            <h3 className="text-3xl mt-24 text-center text-blue-900 font-bold dark:text-white">
                — Projets mobiles —
            </h3>
            <MobileProjects />
            <br />
            {/* <LearnMoreLink text="Tout mes projets mobiles" href="/projects" /> */}
        </div>
    )
}

export default RecentProjects
