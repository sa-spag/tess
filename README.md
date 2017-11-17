# Tess

## Setup

- Node.js (tested on 9.1.0)
- SoX: `brew install sox`

# Save files

- macOS: `~/Library/Application Support/com.steelcrategames.keeptalkingandnobodyexplodes`
- Windows: `C:\Users\$USERNAME\AppData\LocalLow\Steel Crate Games\Keep Talking and Nobody Explodes`

## Keep Talking and Nobody Explodes logs

Located at `/Applications/logs/ktane.log`.

## Text to Speech

```
$ say -v '?' | grep en_US
$ tail -f -n 1 speech | while read line ; do echo $line | say -i -v Samantha ; done
```
