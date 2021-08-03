export const languages = [
  "CSS", "HTML", "Java", "JavaScript", "JSON", "PHP", "Python", "SQL", "TypeScript", "JSX"
];

export const jsxText = `class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('timer-example')
);
`;


export const backgroundColorCircle = [
  'linear-gradient(140deg, rgb(76, 200, 200), rgb(32, 32, 51))',
  'linear-gradient(140deg, rgb(255, 207, 115), rgb(255, 122, 47))',
  'linear-gradient(140deg, rgb(207, 47, 152), rgb(106, 61, 236))',
  'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))'
]