import React, { useState } from 'react'
import { PlusIcon, EditIcon, Trash2 } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Note } from '@/types'
import NoteEditor from '../components/notes/NoteEditor'

const Notes: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', [])
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleSaveNote = (note: Note) => {
    const existingNoteIndex = notes.findIndex(n => n.id === note.id)
    
    if (existingNoteIndex > -1) {
      const updatedNotes = [...notes]
      updatedNotes[existingNoteIndex] = note
      setNotes(updatedNotes)
    } else {
      setNotes([...notes, note])
    }
    
    setIsEditing(false)
    setSelectedNote(undefined)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTag ? note.tags?.includes(selectedTag) : true)
  )

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])))

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-focus-primary dark:text-white">
        Notes
      </h1>

      {!isEditing ? (
        <>
          <div className="mb-4 flex space-x-2">
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-focus-accent text-white p-2 rounded hover:opacity-90"
            >
              <PlusIcon size={24} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === tag 
                    ? 'bg-focus-accent text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map(note => (
              <div 
                key={note.id} 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold mb-2 text-focus-primary dark:text-white">
                  {note.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {note.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags?.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button 
                    onClick={() => {
                      setSelectedNote(note)
                      setIsEditing(true)
                    }}
                    className="text-focus-accent hover:opacity-80"
                  >
                    <EditIcon size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:opacity-80"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <NoteEditor 
          note={selectedNote}
          onSave={handleSaveNote}
          onCancel={() => {
            setIsEditing(false)
            setSelectedNote(undefined)
          }}
        />
      )}
    </div>
  )
}

export default Notes