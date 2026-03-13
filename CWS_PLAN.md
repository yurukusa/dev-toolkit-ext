# Chrome Web Store 公開計画

## Phase 1: Dev Toolkit 拡張（MVP）
- **状態**: コード完成、GitHub push済み
- **ブロッカー**: CWS Developer登録 ($5) → ぐらす手動
- **権限**: storage のみ（審査最速）
- **価格**: 無料
- **目標**: 初月1,000インストール

### CWS提出に必要なもの
1. ~~manifest.json~~ ✅
2. ~~popup.html/js~~ ✅
3. ~~アイコン 16/48/128~~ ✅
4. [ ] スクリーンショット 1280x800 × 5枚
5. [ ] プライバシーポリシーURL
6. [ ] 説明文（CWS最適化済み）
7. [ ] プロモーション画像 440x280

### Pro版機能（Phase 1.5）
- お気に入り同期（chrome.storage.sync → 既に実装）
- ダークモード切替
- キーボードショートカット（Ctrl+Shift+T で起動）
- 使用統計（ローカル）
- **価格**: $4.99/月 or $29買い切り
- **決済**: ExtensionPay

## Phase 2: cdp-bridge 拡張
- Claude Code/Desktop からブラウザを直接操作
- 既存コード: ~/chrome-claude-bridge/extension/
- 権限: debugger, tabs, scripting, <all_urls>（審査3-7日）
- **価格**: $19/月 or $99買い切り
- **ターゲット**: Claude Code パワーユーザー

## 月$200シナリオ
- Dev Toolkit Pro: 20人 × $4.99 = $100/月
- cdp-bridge Pro: 5人 × $19 = $95/月
- Ko-fi: 1杯/月 = $5
- **合計: $200/月**
