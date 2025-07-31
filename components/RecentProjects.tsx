"use client"

import React from 'react'

import { Title } from './ui/Title'
import { Quote } from './Quote'
import { MobileProjects } from './MobileProjects'
import { ProjectsSheet } from './ui/ProjectsSheet'


function RecentProjects() {

    return (
        <div id="projects" className="py-16">
            <Title title="3. Projets  récents" />
            <Quote
                quote={"« Il ne savait pas que c’était impossible, alors il l’a fait. »"}
                author={"— Mark Twain"}
            />

            <MobileProjects limit={3} />
            
            <div className="flex justify-end">
                <ProjectsSheet />
            </div>
        </div>
    )
}

export default RecentProjects
