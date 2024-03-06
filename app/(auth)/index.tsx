import { supabase } from '@/utils/supabase';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

const Page = () => {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const addTodo = async () => {
    setLoading(true);

    const {
      data: { user: User },
    } = await supabase.auth.getUser();
    const newTodo = {
      user_id: User?.id,
      task: todo,
    };

    await supabase.from('todos').insert(newTodo).single();

    setTodo('');
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          backgroundColor: '#151515',
          padding: 6,
        }}
      >
        <TextInput
          value={todo}
          onChangeText={setTodo}
          style={{
            flex: 1,
            backgroundColor: '#363636',
            color: '#fff',
            padding: 8,
            borderWidth: 1,
            borderColor: '#2b825b',
            borderRadius: 4,
          }}
        />
        <Button
          onPress={addTodo}
          title="Add"
          color="#2b825b"
          disabled={loading || todo === ''}
        />
      </View>
    </View>
  );
};

export default Page;
