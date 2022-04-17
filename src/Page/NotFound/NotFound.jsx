import React from 'react'
import { Buttons } from "../../Component/Button/Button"
import { useDocumentTitle } from '../../lib/customHooks';

export default function NotFound() {
  useDocumentTitle('Not Found - Spotipy')
  return (
    <main className="center">
      No Content Here...
      <Buttons href="/create-playlist">Go To Content</Buttons>
    </main>
  )
}