import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "wr_my_champs";

// myChamps shape: { "ChampName|role": true }
// e.g. { "Lee Sin|jgl": true, "Orianna|mid": true }

export function useMyChamps() {
  const [myChamps, setMyChamps] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMyChamps(JSON.parse(saved));
    } catch (e) {}
    setLoaded(true);
  }, []);

  const save = useCallback((next) => {
    setMyChamps(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
  }, []);

  const toggle = useCallback((champName, role) => {
    const key = `${champName}|${role}`;
    setMyChamps(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const isMine = useCallback((champName, role) => {
    return !!myChamps[`${champName}|${role}`];
  }, [myChamps]);

  const getMyList = useCallback(() => {
    return Object.keys(myChamps).map(key => {
      const [name, role] = key.split("|");
      return { name, role };
    });
  }, [myChamps]);

  const clearAll = useCallback(() => {
    save({});
  }, [save]);

  return { myChamps, loaded, toggle, isMine, getMyList, clearAll };
}
