import React, { Component } from 'react';


class TabsControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
        this.isCurrentIndex = this.isCurrentIndex.bind(this);
    }

    /** 判断当前tab是否是激发状态*/
    isCurrentIndex(index){
        return index === this.state.currentIndex;
    }

    render() {
        return (
            <div>
                <ul className="tab-nav" data-flex="box:mean">
                    {
                        this.props.tabs.map((tabName, index) => (
                            <li key={index}
                                onClick={() => {this.setState({currentIndex: index})}}
                                className={this.isCurrentIndex(index) ? 'on' : ''}>
                                { tabName }
                            </li>
                        ))
                    }
                </ul>

                {React.Children.map(this.props.children, (element, index) => {
                    return (<div className="tab-content" key={index} style={{ display: this.isCurrentIndex(index) ? 'block' : 'none' }}>{element}</div>)
                })}
            </div>
        )
    }
}


export default TabsControl;