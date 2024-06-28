import React, { useState } from 'react';
import './imcCalculator.css'

const ImcCalculator = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState(null);
  const [buttonLabel, setButtonLabel] = useState('Calcular');
  const [showText, setShowText] = useState(true);
  const [pesoOriginal, setPesoOriginal] = useState(null); // Estado para armazenar o peso original
  const [alturaOriginal, setAlturaOriginal] = useState(null); // Estado para armazenar a altura original

  const calcularImc = () => {
    if (buttonLabel === 'Calcular') {
      // Validação somente se o botão for "Calcular"
      if (peso > 0 && altura > 0) {
        setPesoOriginal(peso);
        setAlturaOriginal(altura);
        const imcCalculado = parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));
        setImc(imcCalculado.toFixed(2));
        setClassificacao(classificarImc(imcCalculado));
        setButtonLabel('Refazer');
        setPeso('');
        setAltura('');
        setShowText(false);
      } else {
        alert("Por favor, insira valores válidos para peso e altura.");
      }
    } else if (buttonLabel === 'Refazer') { // Se o botão for "Refazer"
      setImc(null);
      setClassificacao(null);
      setButtonLabel('Calcular');
      setShowText(true);
    }
  };

  const classificarImc = (imc) => {
    if (imc < 17) {
      return 'Muito abaixo do peso';
    } else if (imc >= 17 && imc < 18.5) {
      return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
      return 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
      return 'Acima do peso';
    } else if (imc >= 30 && imc < 35) {
      return 'Obesidade I';
    } else if (imc >= 35 && imc < 40) {
      return 'Obesidade II (severa)';
    } else {
      return 'Obesidade III (mórbida)';
    }
  };

  return (
    <div className='container'>
      <h1>IMC<span className='text-highlight'>React</span></h1>
      <div className='box'>
        <label htmlFor="peso">Peso (kg):</label>
        <input
          type="number"
          id="peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
      </div>
      <div className='box'>
        <label htmlFor="altura">Altura (m):</label>
        <input
          type="number"
          id="altura"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
      </div>
      <button className='button' onClick={calcularImc}>{buttonLabel}</button>
      {showText && (
        <div className='text'>
        Saiba agora se está no seu peso ideal!
      </div>
      )}
      {imc !== null && (
        <div className='result'>
          <h2 className='imc'>Seu IMC: <span className="text-highlight">{imc}</span></h2>
         
          <div className='info'>
            <div className='peso'>
              <p>Peso</p>
              <span>{pesoOriginal}</span>
            </div>

            <div className='altura'>
              <p>Altura</p>
              <span>{alturaOriginal}</span>
            </div>

            <div className="type">
              <p>Classificação</p>
              <span>{classificacao}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImcCalculator;