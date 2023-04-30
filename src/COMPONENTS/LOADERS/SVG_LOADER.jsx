
const SVG_LOADER = () => {
    let x ;
    let begin;
    return <>
        <svg fill={'none'}
            style={{ transform: 'scale(0.8)', width: '600px', height: '150px', background: 'none' }}
            version="1.1"
            id="L1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 100"
            enableBackground="new 0 0 100 100" >
            <rect opacity={1}
                x={0}
                y={25}
                width={300}
                height={40}
                fill={'white'}
                rx="5" ry="5"
                stroke='black'
                strokeDasharray={2}
            />
            <text x="90" y="52" stroke='black'
                strokeWidth={0.5}
                style={{
                    fontSize: '24px'
                    , fill: 'red'
                    , fontWeight: '800'
                    , fontFamily: 'Arial'

                }}> Загружается...</text>
            <g style={{ transform: 'translateX(-5px)' }}>
                <circle fill="#282c34"
                    stroke="red"
                    strokeWidth="8"
                    strokeMiterlimit="25"
                    strokeDasharray="7"
                    cx="50" cy="50" r="37" >
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="7s"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite" />
                </circle>
                <circle fill="none" stroke="silver"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeDasharray="10,10" cx="50" cy="50" r="10">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="3s"
                        from="0 50 50"
                        to="-360 50 50"
                        repeatCount="indefinite" />
                </circle>
                <g fill="lightblue" stroke='black' strokeWidth={0.5}  >
                    {Array(3).fill(0).map((_, i) => {
                        if (i === 0) { x = 38; begin = 0.1 } else { x += 10; begin += 0.1 }
                        console.log(x)
                        return (
                            <rect key={i} x={x} y="42.5" width="5" height="10" fill='red'>
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    type="translate"
                                    values='0 5 ; 0 -5; 0 5'
                                    repeatCount="indefinite"
                                    begin={begin} />
                            </rect>
                        )
                    }
                    )
                    }
                </g>
            </g>
        </svg>
    </>
}

export default SVG_LOADER;