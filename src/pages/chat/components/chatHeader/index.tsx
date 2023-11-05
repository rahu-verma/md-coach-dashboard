import { FunctionComponent, useCallback } from 'react';
import { useChannelStateContext } from 'stream-chat-react';

import { useChannelPreviewInfo } from '../../hooks';
import CollapseIcon from 'src/assets/images/collapse.png';

import { Button, ButtonsGroup, ChatTitle, Wrapper } from './styles';

type Props = {
    onCollapseButtonClick?: Function;
    onMoreButtonClick?: Function;
};

const ChatHeader: FunctionComponent<Props> = ({
    onCollapseButtonClick
}: Props) => {
    const { channel } = useChannelStateContext();
    const { displayTitle } = useChannelPreviewInfo({ channel });

    const onCollapseButtonCallback = useCallback(() => {
        onCollapseButtonClick && onCollapseButtonClick();
    }, [onCollapseButtonClick]);

    return (
        <Wrapper>
            <ChatTitle>{displayTitle}</ChatTitle>
            <ButtonsGroup>
                <Button onClick={onCollapseButtonCallback}>
                    <img alt="collapse" src={CollapseIcon} />
                </Button>
            </ButtonsGroup>
        </Wrapper>
    );
};

export default ChatHeader;