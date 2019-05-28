import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';

import Waveform from '../waveform/waveform.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import AudioSelector from '../../containers/audio-selector.jsx';
import IconButton from '../icon-button/icon-button.jsx';

import styles from './sound-editor.css';

import playIcon from '../record-modal/icon--play.svg';
import stopIcon from '../record-modal/icon--stop-playback.svg';
import redoIcon from './icon--redo.svg';
import undoIcon from './icon--undo.svg';
import echoIcon from './icon--echo.svg';
import fasterIcon from './icon--faster.svg';
import slowerIcon from './icon--slower.svg';
import louderIcon from './icon--louder.svg';
import softerIcon from './icon--softer.svg';
import robotIcon from './icon--robot.svg';
import alienIcon from './icon--alien.svg';
import magicIcon from './icon--magic.svg';
import reverbIcon from './icon--reverb.svg';
import reverseIcon from './icon--reverse.svg';
import fadeOutIcon from './icon--fade-out.svg';
import fadeInIcon from './icon--fade-in.svg';
import deleteIcon from './icon--delete.svg';
import copyIcon from './icon--copy.svg';
import pasteIcon from './icon--paste.svg';

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    sound: {
        id: 'gui.soundEditor.sound',
        description: 'Label for the name of the sound',
        defaultMessage: 'Sound'
    },
    play: {
        id: 'gui.soundEditor.play',
        description: 'Title of the button to start playing the sound',
        defaultMessage: 'Play'
    },
    stop: {
        id: 'gui.soundEditor.stop',
        description: 'Title of the button to stop the sound',
        defaultMessage: 'Stop'
    },
    trim: {
        id: 'gui.soundEditor.trim',
        description: 'Title of the button to start trimminging the sound',
        defaultMessage: 'Trim'
    },
    save: {
        id: 'gui.soundEditor.save',
        description: 'Title of the button to save trimmed sound',
        defaultMessage: 'Save'
    },
    undo: {
        id: 'gui.soundEditor.undo',
        description: 'Title of the button to undo',
        defaultMessage: 'Undo'
    },
    redo: {
        id: 'gui.soundEditor.redo',
        description: 'Title of the button to redo',
        defaultMessage: 'Redo'
    },
    faster: {
        id: 'gui.soundEditor.faster',
        description: 'Title of the button to apply the faster effect',
        defaultMessage: 'Faster'
    },
    slower: {
        id: 'gui.soundEditor.slower',
        description: 'Title of the button to apply the slower effect',
        defaultMessage: 'Slower'
    },
    echo: {
        id: 'gui.soundEditor.echo',
        description: 'Title of the button to apply the echo effect',
        defaultMessage: 'Echo'
    },
    robot: {
        id: 'gui.soundEditor.robot',
        description: 'Title of the button to apply the robot effect',
        defaultMessage: 'Robot'
    },
    alien: {
        id: 'gui.soundEditor.alien',
        description: 'Title of the button to apply the alien effect',
        defaultMessage: 'Alien'
    },
    magic: {
        id: 'gui.soundEditor.magic',
        description: 'Title of the button to apply the magic effect',
        defaultMessage: 'Magic'
    },
    reverb: {
        id: 'gui.soundEditor.reverb',
        description: 'Title of the button to apply the reverb effect',
        defaultMessage: 'Reverb'
    },
    louder: {
        id: 'gui.soundEditor.louder',
        description: 'Title of the button to apply the louder effect',
        defaultMessage: 'Louder'
    },
    softer: {
        id: 'gui.soundEditor.softer',
        description: 'Title of the button to apply thr.softer effect',
        defaultMessage: 'Softer'
    },
    reverse: {
        id: 'gui.soundEditor.reverse',
        description: 'Title of the button to apply the reverse effect',
        defaultMessage: 'Reverse'
    },
    fadeOut: {
        id: 'gui.soundEditor.fadeOut',
        description: 'Title of the button to apply the fade out effect',
        defaultMessage: 'Fade out'
    },
    fadeIn: {
        id: 'gui.soundEditor.fadeIn',
        description: 'Title of the button to apply the fade in effect',
        defaultMessage: 'Fade in'
    }


});

const SoundEditor = props => (
    <div className={styles.editorContainer}>
        <div className={styles.row}>
            <div className={styles.inputGroup}>
                <Label text={props.intl.formatMessage(messages.sound)}>
                    <BufferedInput
                        tabIndex="1"
                        type="text"
                        value={props.name}
                        onSubmit={props.onChangeName}
                    />
                </Label>
                <div className={styles.buttonGroup}>
                    <button
                        className={styles.button}
                        disabled={!props.canUndo}
                        title={props.intl.formatMessage(messages.undo)}
                        onClick={props.onUndo}
                    >
                        <img
                            className={styles.undoIcon}
                            draggable={false}
                            src={undoIcon}
                        />
                    </button>
                    <button
                        className={styles.button}
                        disabled={!props.canRedo}
                        title={props.intl.formatMessage(messages.redo)}
                        onClick={props.onRedo}
                    >
                        <img
                            className={styles.redoIcon}
                            draggable={false}
                            src={redoIcon}
                        />
                    </button>
                </div>
            </div>
            <IconButton
                className={styles.effectButton}
                disabled={props.trimStart === null}
                img={deleteIcon}
                title={'delete'}
                onClick={props.onActivateTrim}
            />
            <IconButton
                className={styles.effectButton}
                img={copyIcon}
                title={'copy'}
                onClick={props.onCopy}
            />
            <IconButton
                className={styles.effectButton}
                disabled={props.canPaste === false}
                img={pasteIcon}
                title={'paste'}
                onClick={props.onPaste}
            />
        </div>
        <div className={styles.row}>
            <div className={styles.waveformContainer}>
                <Waveform
                    data={props.chunkLevels}
                    height={160}
                    width={600}
                />
                <AudioSelector
                    playhead={props.playhead}
                    trimEnd={props.trimEnd}
                    trimStart={props.trimStart}
                    onPlay={props.onPlay}
                    onSetTrim={props.onSetTrim}
                    onStop={props.onStop}
                />
            </div>
        </div>
        <div className={classNames(styles.row, styles.rowReverse)}>
            <div className={styles.inputGroup}>
                {props.playhead ? (
                    <button
                        className={classNames(styles.roundButton, styles.stopButtonn)}
                        title={props.intl.formatMessage(messages.stop)}
                        onClick={props.onStop}
                    >
                        <img
                            draggable={false}
                            src={stopIcon}
                        />
                    </button>
                ) : (
                    <button
                        className={classNames(styles.roundButton, styles.playButton)}
                        title={props.intl.formatMessage(messages.play)}
                        onClick={props.onPlay}
                    >
                        <img
                            draggable={false}
                            src={playIcon}
                        />
                    </button>
                )}
            </div>
            <IconButton
                className={styles.effectButton}
                img={fasterIcon}
                title={<FormattedMessage {...messages.faster} />}
                onClick={props.onFaster}
            />
            <IconButton
                className={styles.effectButton}
                img={slowerIcon}
                title={<FormattedMessage {...messages.slower} />}
                onClick={props.onSlower}
            />
            <IconButton
                className={styles.effectButton}
                img={echoIcon}
                title={<FormattedMessage {...messages.echo} />}
                onClick={props.onEcho}
            />
            <IconButton
                className={styles.effectButton}
                img={robotIcon}
                title={<FormattedMessage {...messages.robot} />}
                onClick={props.onRobot}
            />
            <IconButton
                className={styles.effectButton}
                img={alienIcon}
                title={<FormattedMessage {...messages.alien} />}
                onClick={props.onAlien}
            />
            <IconButton
                className={styles.effectButton}
                img={magicIcon}
                title={<FormattedMessage {...messages.magic} />}
                onClick={props.onMagic}
            />
            <IconButton
                className={styles.effectButton}
                img={reverbIcon}
                title={<FormattedMessage {...messages.reverb} />}
                onClick={props.onReverb}
            />
            <IconButton
                className={styles.effectButton}
                img={louderIcon}
                title={<FormattedMessage {...messages.louder} />}
                onClick={props.onLouder}
            />
            <IconButton
                className={styles.effectButton}
                img={softerIcon}
                title={<FormattedMessage {...messages.softer} />}
                onClick={props.onSofter}
            />
            <IconButton
                className={styles.effectButton}
                img={reverseIcon}
                title={<FormattedMessage {...messages.reverse} />}
                onClick={props.onReverse}
            />
            <IconButton
                className={styles.effectButton}
                img={fadeOutIcon}
                title={<FormattedMessage {...messages.fadeOut} />}
                onClick={props.onFadeOut}
            />
            <IconButton
                className={styles.effectButton}
                img={fadeInIcon}
                title={<FormattedMessage {...messages.fadeIn} />}
                onClick={props.onFadeIn}
            />
        </div>
    </div>
);

SoundEditor.propTypes = {
    canPaste: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    chunkLevels: PropTypes.arrayOf(PropTypes.number).isRequired,
    intl: intlShape,
    name: PropTypes.string.isRequired,
    onActivateTrim: PropTypes.func,
    onAlien: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onEcho: PropTypes.func.isRequired,
    onFadeIn: PropTypes.func.isRequired,
    onFadeOut: PropTypes.func.isRequired,
    onFaster: PropTypes.func.isRequired,
    onLouder: PropTypes.func.isRequired,
    onMagic: PropTypes.func.isRequired,
    onPaste: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onReverb: PropTypes.func.isRequired,
    onReverse: PropTypes.func.isRequired,
    onRobot: PropTypes.func.isRequired,
    onSetTrim: PropTypes.func,
    onSlower: PropTypes.func.isRequired,
    onSofter: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    playhead: PropTypes.number,
    trimEnd: PropTypes.number,
    trimStart: PropTypes.number
};

export default injectIntl(SoundEditor);