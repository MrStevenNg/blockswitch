import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
    addToInputLogger,
    highlightTopBlock,
    highlightRightBlock,
    highlightBottomBlock,
    highlightLeftBlock,
    highlightCenterBlock,
    addToPatternArray,
    setDisplayPatternActive,
    setPatternDirection
} from "../actions";
import Cross from "../components/Cross";
import { ButtonWrapper, Button } from "./common";
import ToggleUserInput from "../utils/testComponents/ToggleUserInput";

class GameLogicContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { consoleLogPatternInfo: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.forwardPatternArray != nextProps.forwardPatternArray;
    }

    componentDidUpdate() {
        if (!this.props.displayPatternActive && !this.props.userInputActive) {
            this.props.patternDirection
                ? this.renderPatternToCross(this.props.forwardPatternArray)
                : this.renderPatternToCross(this.props.reversePatternArray);
            this.consoleLogPatternInfo();
        }
    }

    // DEVELOPER FUNCTIONS ////
    // function to display pattern details if local state bool is set to TRUE.
    consoleLogPatternInfo = () => {
        const {
            patternDirection,
            forwardPatternArray,
            reversePatternArray
        } = this.props;
        if (this.state.consoleLogPatternInfo) {
            console.log(`---`);
            console.log(
                `${
                    patternDirection ? "> " : "  "
                }forwardPatternArray: [${forwardPatternArray}]`
            );
            console.log(
                `${
                    !patternDirection ? "> " : "  "
                }reversePatternArray: [${reversePatternArray}]`
            );
            console.log(`---`);
        }
    };

    // RENDER FUNCTIONS ////

    // Used to clean up render function, contains the common components { ButtonWrapper, Button } with necessary passed in props.
    displayGameLoopButton = () => {
        return (
            <ButtonWrapper function={this.gameLoop}>
                <Button
                    text={"Generate Next Block & Display Pattern"}
                    color={"#FFF8DC"}
                    backgroundColor={"#A0522D"}
                    width={"90%"}
                    borderColor={"#FFF8DC"}
                    marginTop={"1%"}
                />
            </ButtonWrapper>
        );
    };

    // Function to highlight the current pattern on the cross component.
    renderPatternToCross = array => {
        if (array.length !== 0) {
            this.props.setDisplayPatternActive(true);
        }
        const delayDuration = 500; // MOVE-TO-STORE
        array.map((block, i) => {
            if (i > 0) {
                setTimeout(() => {
                    this.highlightBlock(block);
                }, delayDuration * i);
            } else {
                this.highlightBlock(block);
            }
            if (i === array.length - 1) {
                setTimeout(() => {
                    this.props.setDisplayPatternActive(false);
                }, delayDuration * array.length);
            }
        });
    };

    // Function to highlight a selected block for 'x' seconds.
    highlightBlock = value => {
        const highlightDuration = 250; // MOVE-TO-STORE
        switch (value) {
            case "T":
                this.props.highlightTopBlock(true);
                setTimeout(() => {
                    this.props.highlightTopBlock(false);
                }, highlightDuration);
                break;
            case "R":
                this.props.highlightRightBlock(true);
                setTimeout(() => {
                    this.props.highlightRightBlock(false);
                }, highlightDuration);
                break;
            case "B":
                this.props.highlightBottomBlock(true);
                setTimeout(() => {
                    this.props.highlightBottomBlock(false);
                }, highlightDuration);
                break;
            case "L":
                this.props.highlightLeftBlock(true);
                setTimeout(() => {
                    this.props.highlightLeftBlock(false);
                }, highlightDuration);
                break;
            case "C":
                this.props.highlightCenterBlock(true);
                setTimeout(() => {
                    this.props.highlightCenterBlock(false);
                }, highlightDuration);
                break;
        }
    };

    // HELPER FUNCTIONS ////

    // function to pass in as props and return type and value from the component that the user pressed.
    handlePress = value => {
        // The following function is used to console log user input to help debug.
        this.userInputLogger(value);
        this.highlightBlock(value);
    };

    // Function to log all user input for debugging and developer screen.
    userInputLogger = value => {
        this.props.addToInputLogger(value);
    };

    gameLoop = () => {
        if (!this.props.displayPatternActive && !this.props.userInputActive) {
            const randomNumber = this.getRandomInt(1, 5);
            const whichDirection = this.getRandomInt(1, 2);

            // Choose random block.
            setTimeout(() => {
                switch (randomNumber) {
                    case 1:
                        this.props.addToPatternArray("T");
                        break;
                    case 2:
                        this.props.addToPatternArray("R");
                        break;
                    case 3:
                        this.props.addToPatternArray("B");
                        break;
                    case 4:
                        this.props.addToPatternArray("L");
                        break;
                    case 5:
                        this.props.addToPatternArray("C");
                        break;
                }
            }, 1000);

            // Choose random pattern direction.
            switch (whichDirection) {
                case 1:
                    this.props.setPatternDirection(true);
                    break;
                case 2:
                    this.props.setPatternDirection(false);
                    break;
            }
        }
    };

    // Function to get a random integer from 'min' through 'max'.
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // RENDER ////

    render() {
        return (
            <View style={styles.container}>
                <Cross onPress={this.handlePress} />
                {this.displayGameLoopButton()}
                <ToggleUserInput />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D2B48C"
    }
});

const mapStateToProps = state => {
    const {
        addToInputLogger,
        highlightTopBlock,
        highlightRightBlock,
        highlightBottomBlock,
        highlightLeftBlock,
        highlightCenterBlock,
        addToPatternArray,
        setDisplayPatternActive,
        setPatternDirection
    } = state;

    // console.log(state.gameState);

    return {
        forwardPatternArray: state.gameState.forwardPatternArray,
        reversePatternArray: state.gameState.reversePatternArray,
        patternDirection: state.gameState.patternDirection,
        displayPatternActive: state.gameState.displayPatternActive,
        blockState: state.display.blockState,
        addToInputLogger,
        highlightTopBlock,
        highlightRightBlock,
        highlightBottomBlock,
        highlightLeftBlock,
        highlightCenterBlock,
        addToPatternArray,
        setDisplayPatternActive,
        setPatternDirection
    };
};

const GameLogicContainerWithNavigation = withNavigation(GameLogicContainer);

export default connect(
    mapStateToProps,
    {
        addToInputLogger,
        highlightTopBlock,
        highlightRightBlock,
        highlightBottomBlock,
        highlightLeftBlock,
        highlightCenterBlock,
        addToPatternArray,
        setDisplayPatternActive,
        setPatternDirection
    }
)(GameLogicContainerWithNavigation);
