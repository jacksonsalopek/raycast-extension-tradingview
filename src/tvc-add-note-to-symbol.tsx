import { LaunchProps, closeMainWindow } from '@raycast/api';
import { runAppleScript } from 'run-applescript';

interface TVCAddNoteToSymbolArgs {
	symbol: string;
	note: string;
}

export default async function TVCAddNoteToSymbol(props: LaunchProps<{ arguments: TVCAddNoteToSymbolArgs }>) {
	const { symbol, note } = props.arguments;
	await closeMainWindow();
	await runAppleScript(`
  on is_running(appName)
    tell application "System Events" to (name of processes) contains appName
  end is_running
  set tvIsRunning to is_running("TradingView")
  if not tvIsRunning then
    tell application "TradingView" to launch
  end if
  tell application "TradingView" to activate
  delay 1
  set symbol to "${symbol}"
  set noteText to "${note}"
  tell application "System Events"
    keystroke symbol
    keystroke return
    keystroke "n" using {option down}
    delay 1
    keystroke noteText
    keystroke return
  end tell`);
}
