import React, { Component } from 'react';


class TabsControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
        this.getTitleItemCssClasses = this.getTitleItemCssClasses.bind(this);
        this.getContentItemCssClasses = this.getContentItemCssClasses.bind(this);
    }

    getTitleItemCssClasses(index) {
        return index === this.state.currentIndex ? 'on' : '';
    }

    getContentItemCssClasses(index) {
        return index === this.state.currentIndex ? 'block' : 'none';
    }

    render() {
        let that = this;

        return (
            <div>
                <ul className="tab-nav" data-flex="box:mean">
                    {
                        this.props.tabs.map((tabName, index) => (
                            <li onClick={() => {this.setState({currentIndex: index})}}
                                className={this.getTitleItemCssClasses(index)}>
                                { tabName }
                            </li>
                        ))
                    }
                </ul>

                {/*{React.Children.map(this.props.children, (element, index) => {*/}
                    {/*return (<div style={{ display: this.getContentItemCssClasses(index) }}>{element}</div>)*/}
                {/*})} */}

                {React.Children.map(this.props.children, (element, index) => {
                    return (<div style={{ display: this.getContentItemCssClasses(index) }}>{element}</div>)
                })}

            </div>
        )
    }
}


export default TabsControl;