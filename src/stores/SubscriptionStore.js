import { observable } from 'mobx'
import { action } from 'mobx'
import UIStore from './UIStore'
import { API } from "aws-amplify";
import UserStore from './UserStore';
import { sortBy } from 'lodash'

class SubscriptionStore {
    @observable storename = null
    @observable tier = ""
    @observable allSubs = []
    @observable currentSub = null

    @action async subscribeEvent(storename, tier, history) {
        if (UserStore.isLoggedIn()) {
            UIStore.loading = true
            try {
                const content = {
                    tier: tier,
                    storename: storename
                }
                await this.subscribe({
                    content: JSON.stringify(content)
                });
                UIStore.closeDialog();
                history.push("/profile");
                if (this.allSubs.length > 0) {
                    UIStore.openSnackBar(`Updated ${storename} Web Store Plan to ${tier.title}`, 5000)
                } else {
                    UIStore.openSnackBar(`Created ${storename} Web Store`, 5000)
                }


            } catch (e) {
                UIStore.loading = false
                UIStore.openSnackBar(e.message, null)
            }
        }
    }

    @action async getSubscriptions() {
        if (UserStore.isLoggedIn()) {
            UIStore.loading = true
            try {
                const subs = await this.subscriptions();
                this.allSubs.replace(sortBy(subs, ['createdAt']).reverse())
                if (subs.length > 0) {
                    this.currentSub = JSON.parse(this.allSubs[0].content)
                }
                UIStore.loading = false
            } catch (e) {
                UIStore.loading = false
                UIStore.openSnackBar(e.message, null)
            }
        }

    }

    subscriptions() {
        return API.get("subscriptions", "/subscriptions");
    }

    subscribe(content) {
        return API.post("subscriptions", "/subscriptions", {
            body: content
        });
    }

}

const userStore = new SubscriptionStore()
export default userStore