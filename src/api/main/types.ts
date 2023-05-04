export interface Response {
    body: Body
    code: number
    errmsg: string
}

export interface Body {
    acceptcommands: string[]
    current_processes: { [key: string]: any }
    healthy_check: HealthyCheck
}

export interface HealthyCheck {
    startproxy: Startproxy
    startros: Startros
}

export interface Startproxy {
    exists: boolean
}

export interface Startros {
    exists: boolean
}

export interface I12Status {
    body: Body
    code: number
    errmsg: string
}
