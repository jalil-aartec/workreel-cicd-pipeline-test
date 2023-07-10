import { FC } from 'react'
import Image from 'next/image'

type Props = {
    width?: string | number
    height?: string | number
    className?: string
}

export const ApplicationLogo: FC<Props> = props => (
    <>
        <Image
            src={'/static/wr-logo.svg'}
            className={'transition-colors'}
            width={200}
            height={100}
            {...props}
            alt={'WorkReel Logo'}
        />
    </>
)

export const ApplicationWhiteLogo: FC<Props> = props => (
    <>
        <Image
            src={'/static/wr-white-logo.svg'}
            className={'transition-colors'}
            width={200}
            height={100}
            {...props}
            alt={'WorkReel Logo'}
        />
    </>
)
