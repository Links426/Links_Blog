import type { Component } from 'vue'

export type Person = string | { name: string; link: string }

export interface RawEpisode {
    date: string
    hosts: Person[]
    guests: Person[]
    title: string
    description: string
    default: Component
}

export interface Episode extends Omit<RawEpisode, 'date'> {
    date: number | string
    id: string
}

export const getEpisodeId = (filename: string) => {
    return /episode[/\\](.*?)\.md$/.exec(filename)?.[1] ?? undefined
}

export const getAllEpisode = () =>
    Object.entries(
        import.meta.glob<RawEpisode>('../episode/*.md', { eager: true })
    ).map(([filename, module]): Episode => {
        const id = getEpisodeId(filename)!
        return {
            ...module,
            id,
            date: module.date,
        }
    })
