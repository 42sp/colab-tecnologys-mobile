import { Modal, Text, Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type ErrorModalProps = {
  visible: boolean;
  message: string;
  description?: string;
  onClose: () => void;
};

export function ErrorModal({ visible, message, description, onClose }: ErrorModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white w-full rounded-t-2xl p-6 pt-12 shadow-2xl relative">
          <View className="absolute top-2 right-2">
            <Pressable
              onPress={onClose}
              className="p-3"
              hitSlop={10}
            >
              <Feather name="x" size={20} color="#333" />
            </Pressable>
          </View>

          <Text className="text-lg font-bold text-[#B73131] mb-2 pr-8">{message}</Text>
          {description ? <Text className="text-base text-gray-700">{description}</Text> : null}
        </View>
      </View>
    </Modal>
  );
}

