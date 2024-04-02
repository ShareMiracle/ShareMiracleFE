export declare type Username = { username: string }
export declare type EmailAddress = { emailAddress: string }
export declare type Password = { password: string }
export declare type RepeatPassord = { repeatPassword: string }

export declare type SignInForm = EmailAddress & Password
export declare type SignUpForm = EmailAddress & Password & RepeatPassord

export declare interface FloatWindowProps {
    buttonClass?: string
    headerClass?: string
    contentClass?: string
    hiddeDelay?: number
    animation?: string
}