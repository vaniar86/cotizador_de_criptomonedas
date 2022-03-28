import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #ffff;
  font-weigth: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-top: 25px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = () => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  const [moneda, SelectMonedas] = useSelectMonedas(
    "Seleccione su moneda",
    monedas
  );
  const [cripto, SelectCripto] = useSelectMonedas(
    "Seleccione una Criptomoneda",
    criptomonedas
  );

  useEffect(() => {
    if (moneda !== "") {
      const getCripto = async () => {
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        const arrayCripto = resultado.Data.map((cripto) => {
          const objectValue = {
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName,
          };
          return objectValue;
        });
        console.log(arrayCripto);
        setCriptomonedas(arrayCripto);
      };
      getCripto();
    }
  }, [moneda]);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${cripto}&tsym=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        console.log(resultado)
    }
    
   

  return (
    <form onSubmit={handleSubmit}>
      <SelectMonedas />
      <SelectCripto />
      <InputSubmit type="submit" value="cotizar" />
    </form>
  );
};

export default Formulario;
