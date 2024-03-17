import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

const DiasContainer = styled.div`
  margin-top:10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 500px;
  height: 300px;
  margin-left: 414px;
`;

const HorasContainer = styled.div`
  margin-top: -195px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 500px;
  height: 300px;
  margin-left: 405px;
`;

const Grupo = styled.div`
  margin: 0;
  flex: 1 1 calc(33% - 20px);
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Li = styled.li`
  margin-bottom: 5px;
  font-size: 12px; /* Tamaño de fuente de 12px para el texto de la lista */


`;

const Label = styled.label`
  font-size: 12px; /* Tamaño de fuente de 12px para las etiquetas */
`;

const RectangularButton = styled.button`
 background-color: #2a2040;
  width: 400px;

  height: 30px;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;
  color: white; 
`;
const BotonContainer = styled.div`
margin-top: -150px;  
margin-left: 390px; 
`;
const HorasTitle = styled.p`
  text-align: center; /* Alinea el texto al centro */
  margin-top: -10px; /* Aplica un margen negativo en la parte superior */

  `;
const DiasHoras =styled.div`

margin-top: 100px; /* Aplica un margen negativo en la parte superior */
margin-left: 100px; 
`;


const CustomCheckbox = styled.input`
  margin-right: 5px;
  accent-color: #2a2040;

`;

export function Dias_Horas() {
  return (
    
    
    
    <Container>
         <DiasHoras>Horas y Dias Habiles Para Hanbientes</DiasHoras>
         
          
              <DiasContainer id="dias">
             
                  <HorasTitle id="persona">Dias</HorasTitle>
                  <Grupo className="grupo">
                      <Ul>
                          <Li>
                          <CustomCheckbox type="checkbox" id="lunes" />
                              <Label htmlFor="lunes">Lunes</Label>
                          </Li>
                          <Li>
                              <CustomCheckbox type="checkbox" id="miercoles" />
                              <Label htmlFor="miercoles">Miércoles</Label>
                          </Li>
                          <Li>
                              <CustomCheckbox type="checkbox" id="viernes" />
                              <Label htmlFor="viernes">Viernes</Label>
                          </Li>
                      </Ul>
                  </Grupo>
                  <Grupo className="grupo">
                      <Ul>
                          <Li>
                              <input type="checkbox" id="martes" />
                              <Label htmlFor="martes">Martes</Label>
                          </Li>
                          <Li>
                              <input type="checkbox" id="jueves" />
                              <Label htmlFor="jueves">Jueves</Label>
                          </Li>
                          <Li>
                              <input type="checkbox" id="sabado" />
                              <Label htmlFor="sabado">Sábado</Label>
                          </Li>
                      </Ul>
                  </Grupo>
              </DiasContainer>
          

          <HorasContainer id="horas">
              <HorasTitle id="persona">Horas</HorasTitle>
              <Grupo className="grupo">
                  <Ul>
                      <Li>
                          <input type="checkbox" id="6:45-8:15" />
                          <Label htmlFor="6:45-8:15">6:45-8:15</Label>
                      </Li>
                      <Li>
                          <input type="checkbox" id="9:45-11:15" />
                          <Label htmlFor="9:45-11:15">9:45-11:15</Label>
                      </Li>
                      <Li>
                          <input type="checkbox" id="12:45-14:15" />
                          <Label htmlFor="9:45-11:15">12:45-14:15</Label>
                      </Li>
                      <Li>
                          <input type="checkbox" id="15:45:-17:15" />
                          <Label htmlFor="9:45-11:15">15:45:-17:15</Label>
                      </Li>
                      <Li>
                          <input type="checkbox" id="18:45-20:15" />
                          <Label htmlFor="9:45-11:15">18:45-20:15</Label>
                      </Li>
                  </Ul>
              </Grupo>
              <Grupo className="horas">
                  <Ul>
                      <Li>
                          <input type="checkbox" id="6:45-8:15" />
                          <Label htmlFor="6:45-8:15">8:15-9:45</Label>
                      </Li>
                      <Li>
                          <input type="checkbox" id="9:45-11:15" />
                          <Label htmlFor="9:45-11:15">11:15-12:45</Label>
                      </Li>
                      <Li>
                          <input type="checkbox" id="12:45-14:15" />
                          <Label htmlFor="9:45-11:15">14:15-15:45</Label>
                      </Li>
                      <Li>
                          <input type="checkbox" id="15:45:-17:15" />
                          <Label htmlFor="9:45-11:15">17:15:-18:45</Label>
                      </Li>
                      <Li>
                          <input type="checkbox" id="18:45-20:15" />
                          <Label htmlFor="9:45-11:15">20:15-20:45</Label>
                      </Li>
                  </Ul>
              </Grupo>
          </HorasContainer>
          <BotonContainer id="botoon">
              <RectangularButton>Registrar Ambiente</RectangularButton>
          </BotonContainer>
      </Container>
  );
}
