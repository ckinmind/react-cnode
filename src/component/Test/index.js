import React from 'react';
import './test.css';

class TabsControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
        this.getTitleItemCssClasses = this.getTitleItemCssClasses.bind(this);
        this.getContentItemCssClasses = this.getContentItemCssClasses.bind(this);
    }

    getTitleItemCssClasses(index) {
        return index === this.state.currentIndex ? "tab-title-item active" : "tab-title-item";
    }

    getContentItemCssClasses(index) {
        return index === this.state.currentIndex ? "tab-content-item active" : "tab-content-item";
    }

    render() {
        let that = this;
        let {baseWidth} = this.props;
        let childrenLength = this.props.children.length;
        return (
            <div>
                <nav className="tab-title-items">
                    {React.Children.map(this.props.children, (element, index) => {
                        return (
                            <div onClick={() => {
                                this.setState({currentIndex: index})
                            }} className={that.getTitleItemCssClasses(index)}>
                                {element.props.name}
                            </div>
                        )
                    })}
                </nav>
                <div className="tab-content-items">
                    {React.Children.map(this.props.children, (element, index) => {
                        return (<div className={that.getContentItemCssClasses(index)}>{element}</div>)
                    })}
                </div>
            </div>
        )
    }
}


let Tab = ({children}) => (
    <div>{ children }</div>
);



export default { Tab, TabsControl };
