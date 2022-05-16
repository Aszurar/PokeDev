import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import { useTheme } from 'styled-components/native';
import { ChevronsRight } from 'react-native-feather';
import {
    Container,
    FieldTextContainer,
    HeaderMain,
    Main,
    ModalContainer,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { IMoveInfo } from '../MovesModal';
import { api } from '../../services/api';
import { MoveDTO } from '../../dtos/MoveDTO';
import { FildInfoText } from '../FildInfoText';
import { HeaderModal } from '../HeaderModal';

interface IModal {
    isVisible: boolean;
    onOpen: () => void;
    onClose: () => void;
    moveInfo: IMoveInfo;
}

type IMoveData = Pick<MoveDTO,
    "pp" |
    "type" |
    "power" |
    "accuracy" |
    "damage_class" |
    "effect_chance" |
    "effect_entries" |
    "flavor_text_entries"
>

const defaultMovesData: IMoveData = {
    pp: 0,
    type: {
        name: "",
        url: ""
    },
    power: 0,
    accuracy: 0,
    damage_class: {
        name: "",
    },
    effect_chance: 0,
    effect_entries: [{
        effect: "",
        language: {
            name: "",
        }
    }],
    flavor_text_entries: [{
        flavor_text: "",
        language: {
            name: "",
        },
        version_group: {
            name: "",
        }
    }]

}
export function MoveDetailsModal({
    moveInfo,
    onOpen,
    onClose,
    isVisible,
}: IModal) {

    const theme = useTheme();
    const [moveData, setMoveData] = useState<IMoveData>(defaultMovesData)
    const [isLoading, setisLoading] = useState(true);

    const [describe, setDescribe] = useState("");
    const [effect, setEffect] = useState("");

    useEffect(() => {
        async function loadMoveInfo() {
            setisLoading(true);
            try {
                const response = await api.get(moveInfo.url.split('v2/')[1]);
                const data = response.data as MoveDTO;
                setMoveData(data);

                setDescribe(data.flavor_text_entries.reverse()
                    .find(item => item.language.name === "en")!
                    .flavor_text);

                setEffect(data.effect_entries.reverse()
                    .find(item => item.language.name === "en")!
                    .effect);

                setisLoading(false);
            } catch (err) {
                console.log(err);
            } finally {
                setisLoading(false);
            }
        }
        loadMoveInfo();
    }, [moveInfo])

    return (
        <Container>
            <Modal
                isVisible={isVisible}
                animationInTiming={700}
                animationOutTiming={700}
                animationIn={"fadeInLeftBig"}
                animationOut={"fadeOutRightBig"}
                backdropOpacity={0.5}
                swipeDirection={['right']}
                swipeThreshold={200}
                onSwipeComplete={onClose}
                onSwipeCancel={onOpen}
                useNativeDriverForBackdrop
                style={{ width: '100%', alignSelf: 'center', justifyContent: 'flex-end' }}
            >
                <ModalContainer>
                    <HeaderModal
                        onClose={onClose}
                        icon={ChevronsRight}
                        iconColor={theme.colors.black}
                        titleColor={theme.colors.black}
                        backgroundColor={theme.colors.shape}
                        title={moveInfo.name.replace("-", " ")}
                    />

                    <Main>
                        <HeaderMain>
                            <FildInfoText
                                label="Tipo:"
                                isTextWrap
                                textField='type'
                                isLoading={isLoading}
                                text={moveData.type.name}
                                widthInPercentageLoad={RFValue(75)}
                            />

                            <FildInfoText
                                label="Poder:"
                                alignText={moveData.power === null ? 'center' : 'flex-end'}
                                isTextWrap
                                isLoading={isLoading}
                                widthInPercentageLoad={RFValue(60)}
                                textField={moveData.power === null ? "" : 'status'}
                                text={moveData.power === null ? "-" : String(moveData.power)}
                            />

                            <FildInfoText
                                label="PP:"
                                alignText='flex-end'
                                isTextWrap
                                textField='status'
                                isLoading={isLoading}
                                text={String(moveData.pp)}
                                widthInPercentageLoad={RFValue(60)}
                            />

                            <FildInfoText
                                label="Precisão:"
                                alignText={moveData.accuracy === null ? 'center' : 'flex-end'}
                                isTextWrap
                                textField={moveData.accuracy === null ? "" : 'status'}
                                isLoading={isLoading}
                                text={moveData.accuracy === null ? "-" : String(moveData.accuracy) + "%"}
                                widthInPercentageLoad={RFValue(75)}
                            />
                        </HeaderMain>
                        <FieldTextContainer>
                            <FildInfoText
                                rowDirection
                                textField={moveData.damage_class ? "status" : ""}
                                isLoading={isLoading}
                                label="Tipo de Movimento:"
                                widthInPercentageLoad={100}
                                text={moveData.damage_class ? moveData.damage_class.name : "-"}
                            />
                        </FieldTextContainer>

                        <FieldTextContainer>
                            <FildInfoText
                                label="Descrição:"
                                isTextWrap
                                isLoading={isLoading}
                                text={describe.replace(/\n/g, " ").replace(/\n\n/g, "\n")}
                                widthInPercentageLoad={100}
                            />
                        </FieldTextContainer>


                        <FieldTextContainer>
                            <FildInfoText
                                label="Efeito(s):"
                                isTextWrap
                                isLoading={isLoading}
                                text={effect.replace(/\$effect_chance/g,
                                    String(moveData.effect_chance)).replace(/\n/g, " ").replace(/\n\n/g, "\n")}
                                widthInPercentageLoad={100}
                            />
                        </FieldTextContainer>
                    </Main>
                </ModalContainer>
            </Modal>
        </Container >
    );
}
