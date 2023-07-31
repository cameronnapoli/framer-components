import { motion, useAnimation } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"
import { useEffect, useRef, useLayoutEffect, useState } from "react"

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function AnimatedArrow(props) {
    const rootRef = useRef(null)
    const opacityAnimation = useAnimation()
    const lineAnimation = useAnimation()
    const arrowAnimation1 = useAnimation()
    const arrowAnimation2 = useAnimation()
    const [dimensions, setDimensions] = useState(null)

    useLayoutEffect(() => {
        if (rootRef.current) {
            const rect = rootRef.current.getBoundingClientRect()
            const ASPECT_RATIO = 0.56
            setDimensions({
                width: rect.width,
                height: rect.width / ASPECT_RATIO,
            })
        }
    }, [])

    useEffect(() => {
        const fn = async () => {
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 200)
            })
            await opacityAnimation.start({
                opacity: [0, 1],
                transition: { duration: 0.15 },
            })
            await lineAnimation.start({
                pathLength: [0, 1],
                transition: { duration: 1.5 },
            })

            arrowAnimation1.set({ opacity: 1 })
            await arrowAnimation1.start({
                pathLength: [0, 1],
                transition: { duration: 0.15 },
            })

            arrowAnimation2.set({ opacity: 1 })
            await arrowAnimation2.start({
                pathLength: [0, 1],
                transition: { duration: 0.15 },
            })
        }
        fn()
    }, [lineAnimation, arrowAnimation1, arrowAnimation2])

    if (!dimensions) {
        return <div ref={rootRef} />
    }

    return (
        <div ref={rootRef}>
            <motion.svg
                width={dimensions.width}
                height={dimensions.height}
                viewBox="0 -10 358 642"
                fill="none"
                animate={opacityAnimation}
                initial={{ opacity: 0 }}
            >
                <motion.circle
                    cx="100"
                    cy="4"
                    r={(props.strokeWidth * 3) / 2}
                    fill={props.color}
                />
                <motion.path
                    d="M99.717 2.5C222.5 2.5 353.117 42 354.717 200C356.717 397.5 199.5 444.5 99.717 444.5C38 444.5 3 406 3 364C3 322 43.7829 280 123.5 280C238.283 280 291.5 367.751 291.5 481C291.5 570.5 264.5 605.5 253.5 627"
                    stroke={props.color}
                    strokeWidth={`${props.strokeWidth}`}
                    strokeLinecap="round"
                    // Apply the animation controls to the path element
                    animate={lineAnimation}
                    // Set initial state of the path's stroke-dasharray (to be animated)
                    initial={{ pathLength: 0 }}
                />
                <motion.line
                    x1="275"
                    y1="620"
                    x2="253.5"
                    y2="627"
                    stroke={props.color}
                    strokeWidth={`${props.strokeWidth}`}
                    strokeLinecap="round"
                    animate={arrowAnimation1}
                    initial={{ pathLength: 0, opacity: 0 }}
                />
                <motion.line
                    x1="253.5"
                    y1="627"
                    x2="250"
                    y2="605"
                    stroke={props.color}
                    strokeWidth={`${props.strokeWidth}`}
                    strokeLinecap="round"
                    animate={arrowAnimation2}
                    initial={{ pathLength: 0, opacity: 0 }}
                />
            </motion.svg>
        </div>
    )
}

AnimatedArrow.defaultProps = {
    strokeWidth: 5,
    color: "#000",
}

addPropertyControls(AnimatedArrow, {
    strokeWidth: {
        type: ControlType.Number,
        title: "Stroke Width",
    },
    color: {
        type: ControlType.Color,
        title: "Color",
    },
})
