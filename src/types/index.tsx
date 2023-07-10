import { Dispatch, SetStateAction } from 'react'

export type Middleware = {
    middleware?: string
    redirectIfAuthenticated?: string
}

export type LoginInputType = {
    email: string
    password: string
    remember_me?: boolean

    // eslint-disable-next-line no-empty-pattern
    setErrors({}): void
}

export type Register = {
    data: {
        first_name?: string
        last_name?: string
        email?: string
        password?: string
        role?: string
    }
    //
    // eslint-disable-next-line no-empty-pattern
    // setErrors({}): void

    // eslint-disable-next-line no-unused-vars
    // setLoading(loading: boolean): void
}

export type Login = {
    email: string
    password: string

    // eslint-disable-next-line no-empty-pattern
    setErrors({}): void

    // eslint-disable-next-line no-unused-vars
    setLoading(loading: boolean): void
}

export type ForgotPassword = {
    email: string

    setStatus: Dispatch<SetStateAction<null>>

    // eslint-disable-next-line no-empty-pattern
    setErrors({}): void

    // eslint-disable-next-line no-unused-vars
    setLoading(loading: boolean): void
}

export type ResetPassword = {
    setStatus: Dispatch<SetStateAction<null>>
    email: string
    password: string
    password_confirmation: string

    // eslint-disable-next-line no-empty-pattern
    setErrors({}): void
}

export type ResendEmailVerification = {
    setStatus: Dispatch<SetStateAction<null>>
}

export type SendMessage = {
    firstName: string
    lastName: string
    phone: string
    email: string
    country: string
    message: string

    setStatus(args: unknown | null): void | null
    // eslint-disable-next-line no-empty-pattern
    setErrors({}): void

    // eslint-disable-next-line no-unused-vars
    setLoading(loading: boolean): void
}

export type EachCountry = {
    name: {
        common: string
    }
}

export type AuthModalsPropsType = {
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export interface UserInput {
    first_name: string
    last_name: string
    password: string
    email?: string
    phone?: string
    role: string
}

export type UpdateAuthComponentPropsType = {
    currentAuthComponent?: string
    setCurrentAuthComponent: Dispatch<SetStateAction<string>>
    state: UserInput
    errors?: string[]
    setState: Dispatch<SetStateAction<UserInput>>
    setErrors: Dispatch<SetStateAction<string[]>>
    setShowModal: Dispatch<SetStateAction<boolean>>
    handleRegister?: () => void
}

export type ExperienceType = {
    title: string
    business_name: string
    instagram_name: string
    website: string
    duration: {
        from: string
        to: string
    }
}

export type AddressType = {
    description: string
    location: {
        lat: number
        lng: number
    }
}

export type AddingExperiencePropsType = {
    experienceModal?: boolean
    experience: ExperienceType[]
    setExperience: Dispatch<SetStateAction<ExperienceType[]>>
    setExperienceModal: Dispatch<SetStateAction<boolean>>
}

export type EducationType = {
    school: string
    degree: string
    duration: {
        from: string
        to: string
    }
}

export type AddEducationPropsType = {
    educationModal?: boolean
    education: Array<EducationType>
    setEducation: Dispatch<SetStateAction<Array<EducationType>>>
    setEducationModal: Dispatch<SetStateAction<boolean>>
}

export type TagsType = {
    id?: number
    name: string
    selected?: boolean
    addedByUser?: boolean
}

export type JobComponentType = {
    data: FindJobType
    setData: Dispatch<SetStateAction<FindJobType>>
    setComponent: Dispatch<SetStateAction<string>>
}

export type FindJobType = {
    positions: (number | undefined)[]
    job_type_id: (number | undefined)[]
    startDate: string
    salary_type: string
    isUserCreated: boolean
    userCreatedPositions: TagsType[]
    rate_from: number
    rate_to: number
}
