import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from '@/ui/alert-dialog';
import { Button, ButtonText } from '@/ui/button';
import React from 'react';
import { Text, View } from 'react-native';

export function ExampleGluestack() {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowAlertDialog(false);
  return (
    <View className="flex-1 items-center">
      <Button onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Open Dialog Gluestack</ButtonText>
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text className="font-semibold text-typography-950">
              Are you sure you want to delete this post?
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody className="mb-4 mt-3">
            <Text>
              Deleting the post will remove it permanently and cannot be undone. Please confirm if
              you want to proceed.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button variant="outline" action="secondary" onPress={handleClose} size="sm">
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" onPress={handleClose}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
