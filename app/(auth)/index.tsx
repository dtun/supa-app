import { Todo } from '@/utils/interfaces';
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  TextInput,
  View,
  Text,
} from 'react-native';

const Page = () => {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = async () => {
    setLoading(true);

    const {
      data: { user: User },
    } = await supabase.auth.getUser();
    const newTodo = {
      user_id: User?.id,
      task: todo,
    };

    const result = await supabase
      .from('todos')
      .insert(newTodo)
      .select()
      .single();

    setTodo('');
    setLoading(false);
    setTodos([result.data, ...todos]);
  };

  useEffect(() => {
    const loadTodos = async () => {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('inserted_at', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setTodos(todos);
      }
    };

    loadTodos();
  }, []);

  const renderRow: ListRenderItem<Todo> = ({ item }: { item: Todo }) => (
    <View style={{ padding: 12, flexDirection: 'row', gap: 10, height: 44 }}>
      <Text style={{ flex: 1 }}>{item.task}</Text>
      {item.is_complete && (
        <Ionicons
          name="checkmark-done-circle-outline"
          size={24}
          color="#151515"
        />
      )}
    </View>
  );

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
      <FlatList data={todos} renderItem={renderRow} />
    </View>
  );
};

export default Page;
