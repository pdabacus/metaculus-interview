import React, {Component} from 'react';
import './App.css';
import Chart, {ChartData} from './components/Chart';

interface AppProps {
}

interface SavedChart {
    id: number
    chart_name: string,
    chart_id: string,
    chart_data: ChartData,
}

interface AppState {
    chart_name: string,
    chart_id: string,
    chart_data: ChartData,
    saved_charts: Array<SavedChart>,
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
            chart_name: "Example Chart",
            chart_id: "example-chart",
            chart_data: {
                x: [-4,-3,-2,-1,0,1,2,3,4],
                y: [f(-4),f(-3),f(-2),f(-1),f(0),f(1),f(2),f(3),f(4)],
            },
            saved_charts: [],
        }
    }

    componentDidMount() {
        this.get_saved_charts();
    }

    get_saved_charts() {
        fetch("/api/chart/all")
            .then(response => response.json())
            .then(json => {
                this.setState({saved_charts: json})
                console.log("fetched saved charts")
            })
            .catch(error => {console.log(error)});
    }

    handle_chart_click(chart_id:number) {
        const chart = this.state.saved_charts.filter((el) => el.id = chart_id)[0]
        this.setState({chart_name: chart.chart_name, chart_id: chart.chart_id, chart_data:chart.chart_data})
    }

    render() {
        return (
            <div id="App">
                <div>
                    <h2>Display Chart</h2>
                    <Chart name={this.state.chart_name}
                        chart_id={this.state.chart_id}
                        data={this.state.chart_data}/>
                </div>
                <div>
                    <h2>Load Saved Charts</h2>
                    <ul>
                        {this.state.saved_charts.map(chart =>
                            <li key={chart.id}
                                onClick={()=>{this.handle_chart_click(chart.id);}}>
                                {chart.chart_name}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;