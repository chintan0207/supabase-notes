import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function HomeScreen() {
  const [notes, setNotes] = useState<any>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setNotes(data);
    else console.error(error);
  }

  async function addOrUpdateNote() {
    if (!newTitle.trim() || !newNote.trim()) return;

    if (editingId) {
      // UPDATE existing note
      const { error } = await supabase
        .from("notes")
        .update({ title: newTitle, content: newNote })
        .eq("id", editingId);

      if (!error) {
        resetForm();
        fetchNotes();
      } else {
        console.error(error);
      }
    } else {
      // INSERT new note
      const { error } = await supabase
        .from("notes")
        .insert([{ title: newTitle, content: newNote }]);

      if (!error) {
        resetForm();
        fetchNotes();
      } else {
        console.error(error);
      }
    }
  }

  async function deleteNote(id: any) {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (!error) fetchNotes();
    else console.error(error);
  }

  function startEdit(note: any) {
    setEditingId(note.id);
    setNewTitle(note.title);
    setNewNote(note.content);
  }

  function resetForm() {
    setNewTitle("");
    setNewNote("");
    setEditingId(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📒 My Notes</Text>

      {/* Title input */}
      <TextInput
        style={styles.input}
        placeholder="Note title..."
        value={newTitle}
        onChangeText={setNewTitle}
      />

      {/* Content input */}
      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={newNote}
        onChangeText={setNewNote}
      />

      <Button
        title={editingId ? "Update Note" : "Add Note"}
        onPress={addOrUpdateNote}
      />
      {editingId && (
        <Button title="Cancel Edit" color="gray" onPress={resetForm} />
      )}

      <FlatList
        data={notes}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text>{item.content}</Text>
            </View>
            <View style={styles.actions}>
              <Button title="✏️" onPress={() => startEdit(item)} />
              <Button title="❌" onPress={() => deleteNote(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10 },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  noteTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 2 },
  actions: { flexDirection: "row", gap: 5 },
});
