import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatBot from 'react-simple-chatbot';

class Review extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        Arrival: '',
        Departure: '',
        departureDate: '',
        adultMenu: '',
        childMenu: '',
      };
    }
  
    componentWillMount() {
      const { steps } = this.props;
      let { Arrival, Departure, departureDate, adultMenu, childMenu } = steps;
      if (typeof(adultMenu) === 'undefined'){
          adultMenu = {}
        adultMenu.value = 0
      }
      if (typeof(childMenu) === 'undefined'){
        console.log('Time to fix that')
        childMenu = {}
        childMenu.value = 0
      }
      console.log('Arrival: ' + Arrival.value)
      console.log('Departure: ' + Departure.value)
      console.log('departureDate: ' + departureDate.value)
      console.log('Adult tickets: ' + adultMenu.value)
      console.log('Child tickets: ' + childMenu.value)
      
      this.setState({ Arrival, Departure, departureDate, adultMenu, childMenu });
    }
  
    render() {
      const { Arrival, Departure, departureDate, adultMenu, childMenu } = this.state;
      return (
          
        <div style={{ width: '100%' }}>
          <h3>Summary</h3>
          <table>
            <tbody>
              <tr>
                <td>Departing from: {Departure.value}</td>
              </tr>
              <tr>
                <td>Arriving at: {Arrival.value}</td>
              </tr>
              <tr>
                <td>Date of Departure {departureDate.value}</td>
              </tr>
              <tr>
                <td>Number of Adult Tickets</td>
                <td>{adultMenu.value}</td>
              </tr>
              <tr>
                <td>Number of Child Tickets</td>
                <td>{childMenu.value}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }

class TrainTicket extends Component {
    render(){
        return(
            <ChatBot 
                floating ='true'
                botDelay='100' 
                userDelay='100' 
                headerTitle='Test'
                steps = {[
                    {
                        id : '1',
                        message: 'Would you like to book a train ticket today?',
                        trigger: 'bookTicket'
                    },
                    {
                        id: 'bookTicket',
                        options: [
                            { value: 'yes', label: 'Yes', trigger: '3' },
                            { value: 'no', label: 'No', trigger: 'end' },
                          ],
                    },
                    {
                        id: '3',
                        message: 'Where will you be departing from?',
                        trigger: 'Departure'
                    },
                    {
                        id: 'Departure',
                        user: true,
                        trigger: '5'
                    },
                    {
                        id: '5',
                        message: 'Where would you like to arrive?',
                        trigger: 'Arrival'
                    },
                    {
                        id: 'Arrival',
                        user: true,
                        trigger: '7'
                    },
                    {
                        id: '7',
                        message: 'When will you be departing?',
                        trigger: 'departureDate'
                    },
                    {
                        id: 'departureDate',
                        user: true,
                        trigger: '9'
                    },
                    {
                        id: '9',
                        message: 'What tickets will you need?',
                        trigger: 'ticketMain'
                    },
                    {
                        id: 'ticketMain',
                        options: [
                            { value: 'adult', label: 'Adult', trigger: 'ticketAdult' },
                            { value: 'child', label: 'Child', trigger: 'ticketChild' },
                          ],
                    },
                    {
                        id: 'ticketAdult',
                        message: 'How many adult tickets will you need?',
                        trigger: 'adultMenu'
                    },
                    {
                        id: 'adultMenu',
                        user:true,
                        /*validator: (value) => {
                            if (isNaN(value)) {
                              return 'value must be a number';
                            } else if (value < 0) {
                              return 'value must be positive';
                            } else if (value > 20) {
                              return `${value}? Come on!`;
                            }
                        },*/
                        trigger: 'moreTickets'
                    },

                    {
                        id: 'ticketChild',
                        message: 'How many child tickets will you need?',
                        trigger: 'childMenu'
                    },
                    {
                        id: 'childMenu',
                        user:true,
                        trigger: 'moreTickets'
                    },
                
                    {
                        id: 'moreTickets',
                        message: 'Would you like to purchase any more tickets?',
                        trigger: 'ticketOption'
                    },
                    {
                        id: 'ticketOption',
                        options: [
                            {value:"yes", label:"Yes", trigger:"9"},
                            {value:"no", label:"No", trigger:"review"}
                        ]
                    },
                    {
                        id: 'review',
                        component: <Review />,
                        asMessage: true,
                    },

                    {
                        id: 'end',
                        message: 'Alright then.'
                    }
                ]}
            />
        )
    }
}


ReactDOM.render(
  <div>
    <TrainTicket floating ='true' opened='false' botDelay='100' userDelay='100' headerTitle='Test'/>
  </div>,
  document.getElementById('root')
);