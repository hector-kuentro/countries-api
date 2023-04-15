import { FC} from 'react'
import NextImage from 'next/image'
import { ImageProps } from 'next/image'

const Image: FC<ImageProps> = (props) => {
    return (
        <NextImage
            {...props}
            width={props.width || 150}
            height={props.height || 80}
            alt={props.alt || ''}
            onDragStart={e => e.preventDefault()}
            style={{
                pointerEvents: 'none',
                userSelect: 'none'
            }}
        />
    )
}

export default Image