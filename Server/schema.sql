CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    provider TEXT DEFAULT 'local', -- 'local' for email/password, 'google' for OAuth
    theme TEXT DEFAULT 'system', 
    font TEXT DEFAULT 'sans-serif',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT DEFAULT '',
    archived BOOL DEFAULT FALSE,
    last_edited TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    UNIQUE(user_id, name)
);

CREATE TABLE note_tags (
    note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag_id)
);
