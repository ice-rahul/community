import { Button, H1, Paragraph, Separator, Sheet, XStack, YStack, useToastController } from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { signInAnonymously, signOut } from 'app/auth/firebase'
import { useAuth } from 'app/auth/firebase/use-auth'
import React, { useState } from 'react'
import { Text } from 'react-native'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })
  const auth = useAuth()

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>

        <Separator />
      </YStack>

      <XStack>
        <Button {...linkProps}>Link to user</Button>

        {!auth && <Button onPress={signInAnonymously}>Sign in</Button>}

        {auth && (
          <>
            <Text>Welcome, {auth.uid}</Text>
            <Button onPress={signOut}>Sign Out</Button>
          </>
        )}
      </XStack>

      <SheetDemo />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
