import React from 'react'
import './Button.css'

export default (props) => {

    return (
        <button className={`
            button 
            ${props.operation ? 'operation ' : ''}
            ${props.double ? 'double ' : ''}
            ${props.triple ? 'triple ' : ''}
        `}
        onClick={() => props.click && props.click(props.label)} /* Espera receber uma propriedade click via props, essa propriedade é uma função. Vai ser passada como parâmetro dessa função o texto do botão */
        >
            {props.label}
        </button>
    )
}