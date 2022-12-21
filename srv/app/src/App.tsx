import React, {Component} from 'react';
import './App.css';
import Chart, {ChartData} from './components/Chart';

interface AppProps {
}

interface AppState {
    chart_name: string,
    chart_id: string,
    chart_data: ChartData,
}

let normal = (mu:number, s:number) => {
    return (x:number) => {
        return Math.exp(-1 * ((x-mu)/s)**2 / 2)
    };
}
let f = normal(0,2);

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            chart_name: "mychart",
            chart_id: "d3chart",
            chart_data: {
                x: [-4,-3,-2,-1,0,1,2,3,4],
                y: [f(-4),f(-3),f(-2),f(-1),f(0),f(1),f(2),f(3),f(4)],
            }
        }
    }

    render() {
        return (
            <div id="App">
                <Chart name={this.state.chart_name} chart_id={this.state.chart_id} data={this.state.chart_data}/>
            </div>
        );
    }
}

export default App;