import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import {
  Button,
  Center,
  DefaultMantineColor,
  Group,
  RingProgress,
  ThemeIcon,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons';

import type { ButtonProps } from '@mantine/core';

type Props = {
  children: ReactNode;
  iconColor?: DefaultMantineColor;
  onLongPress?: () => void;
  buttonProps?: ButtonProps;
  durationMs?: number;
  disabledWhenLongPressed?: boolean;
};

const LongPressButton = ({
  children,
  iconColor = 'dark',
  onLongPress,
  buttonProps,
  durationMs = 1000,
  disabledWhenLongPressed = true,
}: Props) => {
  // * constants
  const STEP_MS = 50;

  // * local state
  const [progressValue, setProgressValue] = useState(0);

  const interval = useInterval(() => {
    setProgressValue((current) => {
      const stepPercentage = (STEP_MS / durationMs) * 100;
      return current + stepPercentage;
    });
  }, STEP_MS);

  // * for Desktop
  const onMouseDownButton = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setProgressValue(0);
    interval.start();
  };
  const onMouseUpButton = (_event: React.MouseEvent<HTMLButtonElement>) => {
    interval.stop();
    if (!(progressValue >= 100)) setProgressValue(0);
  };
  const onMouseLeaveButton = (_event: React.MouseEvent<HTMLButtonElement>) => {
    interval.stop();
    if (!(progressValue >= 100)) setProgressValue(0);
  };
  // * for Touch Device
  const onTouchStartButton = (_event: React.TouchEvent<HTMLButtonElement>) => {
    setProgressValue(0);
    interval.start();
  };
  const onTouchEndButton = (_event: React.TouchEvent<HTMLButtonElement>) => {
    interval.stop();
    if (!(progressValue >= 100)) setProgressValue(0);
  };
  const onTouchCancelButton = (_event: React.TouchEvent<HTMLButtonElement>) => {
    interval.stop();
    if (!(progressValue >= 100)) setProgressValue(0);
  };

  useEffect(() => {
    if (progressValue >= 100) {
      if (onLongPress != null) onLongPress();
    }
  }, [onLongPress, progressValue]);

  return (
    <Button
      {...buttonProps}
      onMouseDown={onMouseDownButton}
      onMouseUp={onMouseUpButton}
      onMouseLeave={onMouseLeaveButton}
      onTouchStart={onTouchStartButton}
      onTouchEnd={onTouchEndButton}
      onTouchCancel={onTouchCancelButton}
      disabled={
        buttonProps?.disabled ||
        (disabledWhenLongPressed && progressValue >= 100)
      }
    >
      <Group spacing="xs">
        <RingProgress
          label={
            progressValue >= 100 ? (
              <Center>
                <ThemeIcon
                  color={iconColor}
                  variant="filled"
                  radius="lg"
                  size={16}
                >
                  <IconCheck />
                </ThemeIcon>
              </Center>
            ) : null
          }
          size={20}
          thickness={4}
          sections={[{ value: progressValue, color: iconColor }]}
          defaultValue={0}
          sx={{ top: -0.75 }}
        />
        {children}
      </Group>
    </Button>
  );
};

export default LongPressButton;
