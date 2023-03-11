import { LaunchProps, closeMainWindow } from '@raycast/api';
import { runAppleScript } from 'run-applescript';

interface TVCOpenSymbolArgs {
	symbol: string;
}

export default async function TVCOpenSymbol(props: LaunchProps<{ arguments: TVCOpenSymbolArgs }>) {
	const { symbol } = props.arguments;
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
  tell application "System Events"
    keystroke symbol
    keystroke return
  end tell`);
}
