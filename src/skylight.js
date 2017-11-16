import React from 'react';
import styles from './styles';

class SkyLight extends React.Component {

  constructor(props){
    super(props);
    this.state = { isVisible: false };
  }

  componentWillUpdate(nextProps, nextState) {
      if (nextState.isVisible && !this.state.isVisible && this.props.beforeOpen) {
          this.props.beforeOpen();
      }

      if (!nextState.isVisible && this.state.isVisible && this.props.beforeClose) {
          this.props.beforeClose();
      }
  }

  componentDidUpdate(prevProps, prevState) {
      if (!prevState.isVisible && this.state.isVisible && this.props.afterOpen) {
          this.props.afterOpen();
      }

      if (prevState.isVisible && !this.state.isVisible && this.props.afterClose) {
          this.props.afterClose();
      }
  }

  show() {
      this.setState({isVisible: true});
  }

  hide() {
      this.setState({isVisible: false});
  }

  onOverlayClicked(e) {
    if (!this.props.showOverlay) {
      return;
    }

    if (!e.classList.contains('skylight-wrapper')) {
      return;
    }

    if(this.props.hideOnOverlayClicked) {
      this.hide();
      if(this.props.onOverlayClicked) {
        this.props.onOverlayClicked();
      }
    }

    if(this.props.onOverlayClicked) {
      this.props.onOverlayClicked();
    }
 }

  render() {
    var dialogStyles = Object.assign({}, styles.dialogStyles, this.props.dialogStyles);
    var closeButtonStyle = Object.assign({}, styles.closeButtonStyle, this.props.closeButtonStyle);
    var titleStyle = Object.assign({}, styles.title, this.props.titleStyle);

    if (this.state.isVisible) {
        dialogStyles.display = 'block';
    } else {
        dialogStyles.display = 'none';
    }

    return (
        <section className="skylight-wrapper" id={this.props.id} onClick={() => this.onOverlayClicked()}>
            <div style={dialogStyles}>
              <a onClick={() => this.hide()} role="button" style={closeButtonStyle} >&times;</a>
              <h2 style={titleStyle}>{this.props.title}</h2>
              {this.props.children}
            </div>
        </section>
    )
  }
}

SkyLight.displayName = 'SkyLight';

SkyLight.propTypes = {
  afterClose: React.PropTypes.func,
  afterOpen: React.PropTypes.func,
  beforeClose: React.PropTypes.func,
  beforeOpen: React.PropTypes.func,
  closeButtonStyle: React.PropTypes.object,
  dialogStyles: React.PropTypes.object,
  hideOnOverlayClicked: React.PropTypes.bool,
  onOverlayClicked: React.PropTypes.func,
  overlayStyles: React.PropTypes.object,
  showOverlay: React.PropTypes.bool,
  title: React.PropTypes.string,
  titleStyle: React.PropTypes.object,
  id: React.PropTypes.string,
};

SkyLight.defaultProps = {
  title: '',
  showOverlay: true,
  overlayStyles: styles.overlayStyles,
  dialogStyles: styles.dialogStyles,
  closeButtonStyle: styles.closeButtonStyle,
  hideOnOverlayClicked: false,
  id: 'skylight',
};

export default SkyLight;
