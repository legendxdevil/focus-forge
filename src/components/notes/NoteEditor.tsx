import React, { useState, useRef } from 'react'
import { Save, Trash2, Tag } from 'lucide-react'
import { Note } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface NoteEditorProps {
  note?: Note
  onSave: (note: Note) => void
  onCancel: () => void
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [tags, setTags] = useState<string[]>(note?.tags || [])
  const [newTag, setNewTag] = useState('')

  const handleSave = () => {
    if (title.trim()) {
      const noteToSave: Note = {
        id: note?.id || crypto.randomUUID(),
        title: title.trim(),
        content,
        tags,
        createdAt: note?.createdAt || new Date(),
        updatedAt: new Date()
      }
      onSave(noteToSave)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <input 
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-xl font-bold mb-4 p-2 border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      
      <textarea 
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-[200px] p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <div className="flex items-center mb-4">
        <input 
          type="text"
          placeholder="Add tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTag()}
          className="flex-grow p-2 border rounded-l dark:bg-gray-700 dark:border-gray-600"
        />
        <button 
          onClick={addTag}
          className="bg-focus-accent text-white p-2 rounded-r"
        >
          <Tag size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span 
            key={tag} 
            className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm flex items-center"
          >
            {tag}
            <button 
              onClick={() => removeTag(tag)}
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex justify-between">
        <button 
          onClick={handleSave}
          className="bg-focus-accent text-white px-4 py-2 rounded hover:opacity-90 flex items-center"
        >
          <Save size={20} className="mr-2" /> Save
        </button>
        <button 
          onClick={onCancel}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded hover:opacity-90"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default NoteEditor